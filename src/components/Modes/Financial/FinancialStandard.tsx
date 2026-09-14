import { useMemo, useState } from "react";
import { calcCompoundGrowth, calcDiscount, calcLoanPayment, calcSalesTax, FinancialError } from "../../../lib/financial";

type SubMode = "loan" | "growth" | "discount";

const money = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold" style={{ color: "var(--color-display)" }}>
        {label}
      </span>
      <div
        className="flex items-center gap-1 rounded-xl px-3 py-2"
        style={{ backgroundColor: "var(--color-num-btn)" }}
      >
        <input
          type="number"
          inputMode="decimal"
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(e.target.value === "" ? NaN : parseFloat(e.target.value))}
          className="w-full bg-transparent font-rounded text-base font-semibold outline-none"
          style={{ color: "var(--color-num-btn-text)" }}
        />
        {suffix && (
          <span className="text-xs font-bold opacity-60" style={{ color: "var(--color-num-btn-text)" }}>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ResultCard({ rows }: { rows: { label: string; value: string; emphasize?: boolean }[] }) {
  return (
    <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: "var(--color-display)" }}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between py-1">
          <span className="text-xs" style={{ color: "var(--color-display-subtext)" }}>
            {row.label}
          </span>
          <span
            className={`font-rounded font-bold ${row.emphasize ? "text-xl" : "text-sm"}`}
            style={{ color: "var(--color-display-text)" }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const SUB_TABS: { id: SubMode; label: string }[] = [
  { id: "loan", label: "Loan / PMT" },
  { id: "growth", label: "Growth" },
  { id: "discount", label: "Discount & Tax" },
];

export function FinancialStandard() {
  const [subMode, setSubMode] = useState<SubMode>("loan");

  // Loan state
  const [principal, setPrincipal] = useState(20000);
  const [loanRate, setLoanRate] = useState(6.5);
  const [years, setYears] = useState(5);
  const [paymentsPerYear, setPaymentsPerYear] = useState(12);

  // Growth state
  const [growthPrincipal, setGrowthPrincipal] = useState(5000);
  const [growthRate, setGrowthRate] = useState(7);
  const [growthYears, setGrowthYears] = useState(10);
  const [contribution, setContribution] = useState(100);
  const [compoundsPerYear, setCompoundsPerYear] = useState(12);

  // Discount/tax state
  const [price, setPrice] = useState(100);
  const [discountPct, setDiscountPct] = useState(15);
  const [taxPct, setTaxPct] = useState(8.5);

  const loanResult = useMemo(() => {
    try {
      if ([principal, loanRate, years, paymentsPerYear].some((v) => Number.isNaN(v))) return null;
      return calcLoanPayment(principal, loanRate, years, paymentsPerYear);
    } catch (e) {
      return e instanceof FinancialError ? e : null;
    }
  }, [principal, loanRate, years, paymentsPerYear]);

  const growthResult = useMemo(() => {
    if ([growthPrincipal, growthRate, growthYears, contribution, compoundsPerYear].some((v) => Number.isNaN(v)))
      return null;
    return calcCompoundGrowth(growthPrincipal, growthRate, growthYears, compoundsPerYear, contribution);
  }, [growthPrincipal, growthRate, growthYears, contribution, compoundsPerYear]);

  const discountResult = useMemo(() => {
    if ([price, discountPct, taxPct].some((v) => Number.isNaN(v))) return null;
    const { discounted, savings } = calcDiscount(price, discountPct);
    const { total, tax } = calcSalesTax(discounted, taxPct);
    return { discounted, savings, total, tax };
  }, [price, discountPct, taxPct]);

  return (
    <div>
      <div className="scrollbar-none mb-4 flex gap-1 overflow-x-auto rounded-full p-1" style={{ backgroundColor: "var(--color-accent-soft)" }}>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubMode(tab.id)}
            className="btn-press flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              backgroundColor: subMode === tab.id ? "var(--color-accent)" : "transparent",
              color: subMode === tab.id ? "var(--color-equals-btn-text)" : "var(--color-display)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subMode === "loan" && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Loan amount" value={principal} onChange={setPrincipal} suffix="$" />
            <Field label="Annual rate" value={loanRate} onChange={setLoanRate} suffix="%" />
            <Field label="Term (years)" value={years} onChange={setYears} />
            <Field label="Payments / yr" value={paymentsPerYear} onChange={setPaymentsPerYear} />
          </div>
          {loanResult && !(loanResult instanceof FinancialError) ? (
            <ResultCard
              rows={[
                { label: "Payment per period", value: money(loanResult.payment), emphasize: true },
                { label: "Total paid", value: money(loanResult.totalPaid) },
                { label: "Total interest", value: money(loanResult.totalInterest) },
              ]}
            />
          ) : (
            <ResultCard rows={[{ label: "Status", value: "Fill in all fields to purr-form the math" }]} />
          )}
        </div>
      )}

      {subMode === "growth" && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Starting amount" value={growthPrincipal} onChange={setGrowthPrincipal} suffix="$" />
            <Field label="Annual rate" value={growthRate} onChange={setGrowthRate} suffix="%" />
            <Field label="Years" value={growthYears} onChange={setGrowthYears} />
            <Field label="Compounds / yr" value={compoundsPerYear} onChange={setCompoundsPerYear} />
            <Field label="Monthly add-on" value={contribution} onChange={setContribution} suffix="$" />
          </div>
          {growthResult ? (
            <ResultCard
              rows={[
                { label: "Future value", value: money(growthResult.futureValue), emphasize: true },
                { label: "Total contributed", value: money(growthResult.totalContributions) },
                { label: "Interest earned", value: money(growthResult.totalInterest) },
              ]}
            />
          ) : (
            <ResultCard rows={[{ label: "Status", value: "Fill in all fields to purr-form the math" }]} />
          )}
        </div>
      )}

      {subMode === "discount" && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price" value={price} onChange={setPrice} suffix="$" />
            <Field label="Discount" value={discountPct} onChange={setDiscountPct} suffix="%" />
            <Field label="Sales tax" value={taxPct} onChange={setTaxPct} suffix="%" />
          </div>
          {discountResult && (
            <ResultCard
              rows={[
                { label: "Final total", value: money(discountResult.total), emphasize: true },
                { label: "You save", value: money(discountResult.savings) },
                { label: "Tax charged", value: money(discountResult.tax) },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}
