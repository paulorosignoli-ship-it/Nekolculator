// Financial calculations for Nekolculator's Financial modes.
// All money-math here is plain arithmetic — no eval, no external libs.

export class FinancialError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FinancialError";
  }
}

/** Standard loan/mortgage payment (fully amortizing).
 * principal: loan amount, annualRatePct: nominal annual rate in %, years: term in years,
 * paymentsPerYear: compounding/payment frequency (default 12 = monthly).
 */
export function calcLoanPayment(
  principal: number,
  annualRatePct: number,
  years: number,
  paymentsPerYear = 12
): { payment: number; totalPaid: number; totalInterest: number } {
  const n = years * paymentsPerYear;
  const r = annualRatePct / 100 / paymentsPerYear;
  if (n <= 0) throw new FinancialError("Loan term must be greater than zero.");
  let payment: number;
  if (r === 0) {
    payment = principal / n;
  } else {
    payment = (principal * r) / (1 - Math.pow(1 + r, -n));
  }
  const totalPaid = payment * n;
  return { payment, totalPaid, totalInterest: totalPaid - principal };
}

/** Compound interest future value: FV = PV * (1 + r/m)^(m*t), with optional recurring contribution. */
export function calcCompoundGrowth(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
  recurringContribution = 0
): { futureValue: number; totalContributions: number; totalInterest: number } {
  const r = annualRatePct / 100 / compoundsPerYear;
  const n = years * compoundsPerYear;
  const growth = Math.pow(1 + r, n);
  const fvPrincipal = principal * growth;
  const fvContrib = recurringContribution
    ? r === 0
      ? recurringContribution * n
      : recurringContribution * ((growth - 1) / r)
    : 0;
  const futureValue = fvPrincipal + fvContrib;
  const totalContributions = principal + recurringContribution * n;
  return { futureValue, totalContributions, totalInterest: futureValue - totalContributions };
}

export function calcDiscount(price: number, discountPct: number): { discounted: number; savings: number } {
  const savings = price * (discountPct / 100);
  return { discounted: price - savings, savings };
}

export function calcSalesTax(price: number, taxPct: number): { total: number; tax: number } {
  const tax = price * (taxPct / 100);
  return { total: price + tax, tax };
}

// ---------- HP-style Time Value of Money (TVM) ----------

export type TVMKnown = "N" | "I" | "PV" | "PMT" | "FV";

export interface TVMInputs {
  n?: number;
  i?: number; // periodic rate, as a decimal (e.g. 0.005 for 0.5%/period)
  pv?: number;
  pmt?: number;
  fv?: number;
  type?: 0 | 1; // 0 = end of period (ordinary annuity), 1 = beginning (annuity due)
}

function annuityFactor(i: number, n: number): number {
  return i === 0 ? n : (Math.pow(1 + i, n) - 1) / i;
}

export function solveTVM(target: TVMKnown, inputs: TVMInputs): number {
  const { n = 0, i = 0, pv = 0, pmt = 0, fv = 0, type = 0 } = inputs;
  const typeFactor = 1 + i * type;

  switch (target) {
    case "FV": {
      if (i === 0) return -(pv + pmt * n);
      const factor = annuityFactor(i, n);
      return -(pv * Math.pow(1 + i, n) + pmt * typeFactor * factor);
    }
    case "PV": {
      if (i === 0) return -(fv + pmt * n);
      const factor = annuityFactor(i, n);
      return -(fv + pmt * typeFactor * factor) / Math.pow(1 + i, n);
    }
    case "PMT": {
      if (i === 0) {
        if (n === 0) throw new FinancialError("N cannot be zero.");
        return -(pv + fv) / n;
      }
      const factor = annuityFactor(i, n);
      return -(fv + pv * Math.pow(1 + i, n)) / (typeFactor * factor);
    }
    case "N": {
      if (i === 0) {
        if (pmt === 0) throw new FinancialError("Can't solve N with a zero rate and zero payment.");
        return -(fv + pv) / pmt;
      }
      // Solve (1+i)^n * (pv + pmt*typeFactor/i) = pmt*typeFactor/i - fv
      const k = (pmt * typeFactor) / i;
      const numerator = k - fv;
      const denominator = pv + k;
      if (denominator === 0 || numerator / denominator <= 0) {
        throw new FinancialError("These values don't converge to a valid number of periods.");
      }
      return Math.log(numerator / denominator) / Math.log(1 + i);
    }
    case "I": {
      // No closed form in general — solve numerically via bisection on f(i).
      const f = (rate: number) => {
        if (rate === 0) return pv + pmt * n + fv;
        const factor = annuityFactor(rate, n);
        return pv * Math.pow(1 + rate, n) + pmt * (1 + rate * type) * factor + fv;
      };
      let lo = -0.999999;
      let hi = 10; // 1000% per period ceiling
      let fLo = f(lo);
      let fHi = f(hi);
      if (Number.isNaN(fLo) || Number.isNaN(fHi) || fLo * fHi > 0) {
        // try a narrower, more typical bracket first
        lo = -0.5;
        hi = 2;
        fLo = f(lo);
        fHi = f(hi);
        if (fLo * fHi > 0) {
          throw new FinancialError("No interest rate in a reasonable range solves this.");
        }
      }
      let mid = 0;
      for (let iter = 0; iter < 200; iter++) {
        mid = (lo + hi) / 2;
        const fMid = f(mid);
        if (Math.abs(fMid) < 1e-9) break;
        if (fLo * fMid < 0) {
          hi = mid;
          fHi = fMid;
        } else {
          lo = mid;
          fLo = fMid;
        }
      }
      return mid;
    }
  }
}
