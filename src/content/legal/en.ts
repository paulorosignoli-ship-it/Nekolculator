import type { LegalContent } from "./types";

const CONTACT_EMAIL = "hello@nekolculator.com.br";

export const legalEn: LegalContent = {
  privacy: {
    title: "Privacy Policy",
    effectiveDate: "September 15, 2026",
    intro: [
      "Nekolculator (\"we\", \"us\", the \"App\") is a calculator app. This Privacy Policy explains what information the App handles, why, and the choices you have. We've tried to write it the way we'd want it explained to us — plainly, and without hiding the important parts in legal fog.",
      "By using Nekolculator, you agree to the practices described here. If you don't agree, please don't use the App.",
    ],
    sections: [
      {
        heading: "1. Information we collect",
        body: [
          "Nekolculator does not require an account, and we do not collect your name, email address, or any calculations you perform. The math you do in the app stays on your device — it is never sent to us.",
          "The App stores a small set of preferences locally on your device (in your browser's local storage and session storage), such as your chosen cat theme, language, dark/light mode, and whether sound is muted. This information is not transmitted to our servers and is not linked to your identity.",
          "If you install Nekolculator as a Progressive Web App, your device's operating system may record standard installation and usage information (such as app icon usage) the same way it would for any installed app. That is governed by your device manufacturer's own privacy practices, not by us.",
        ],
      },
      {
        heading: "2. Cookies and local storage",
        body: [
          "We use a small number of cookies and browser storage entries to remember your preferences and, once advertising is enabled, to support ad display. See our Cookie Policy for the specific list of what we store and why.",
        ],
      },
      {
        heading: "3. Advertising and third-party services",
        body: [
          "We display advertising through the Monetag ad network, and may add other networks (such as Google AdSense) in the future. These networks may use cookies, device identifiers, or similar technologies to serve ads and measure their performance, which can include personalized advertising based on your browsing activity across sites. Ad scripts only load after you consent to non-essential cookies in the banner shown in the App.",
          "We do not control these third-party technologies directly. We encourage you to review Google's Privacy & Terms (policies.google.com/privacy) and the privacy documentation of any other ad network we use, since their data practices are their own and are not covered by this policy.",
          "Where required by applicable law, we will ask for your consent before enabling non-essential advertising or analytics cookies, through the cookie banner shown in the App.",
        ],
      },
      {
        heading: "4. Children's privacy",
        body: [
          "Nekolculator is not directed at children, and we do not knowingly collect personal information from children. Because we don't collect personal information from anyone in the first place, this is largely academic — but if you believe a child has provided us with personal information, please contact us and we will address it.",
        ],
      },
      {
        heading: "5. Data security",
        body: [
          "Since your calculations and most of your preferences never leave your device, there is very little of yours for us to secure. Where we do process any data (for example, through third-party ad or analytics providers once enabled), we choose providers who apply industry-standard safeguards, but no method of transmission or storage is 100% secure.",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "Depending on where you live, you may have rights to access, correct, delete, or restrict the use of personal data collected about you (for example, under the GDPR in the EU/EEA, the UK GDPR, or the CCPA/CPRA in California). Because Nekolculator does not collect personal data directly, most of these requests would concern data held by our third-party advertising or analytics partners rather than us — but you're welcome to contact us at any time and we'll help point you in the right direction or clear local storage on your behalf where applicable.",
          "You can clear all locally stored preferences at any time by clearing your browser's site data for Nekolculator, or by using your browser's private/incognito mode.",
        ],
      },
      {
        heading: "7. Changes to this policy",
        body: [
          "We may update this Privacy Policy from time to time, for example as we add features like advertising. We'll update the effective date above when we do. Continued use of the App after changes take effect means you accept the revised policy.",
        ],
      },
      {
        heading: "8. Contact us",
        body: [`Questions about this policy? Reach us at ${CONTACT_EMAIL}.`],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    effectiveDate: "September 15, 2026",
    intro: [
      "These Terms of Use (\"Terms\") govern your use of Nekolculator (the \"App\"). By using the App, you agree to these Terms. If you do not agree, please do not use the App.",
    ],
    sections: [
      {
        heading: "1. Description of the service",
        body: [
          "Nekolculator is a calculator application offering basic, scientific, and financial (including HP-12C-style RPN) calculation modes, for personal, informational, and educational use.",
        ],
      },
      {
        heading: "2. Not professional advice",
        body: [
          "Nekolculator is a general-purpose calculation tool. Results from the financial and TVM (time-value-of-money) modes — including loan payments, compound growth, and RPN computations — are provided for illustrative and informational purposes only and do not constitute financial, tax, legal, or accounting advice.",
          "Always verify important calculations independently and consult a qualified professional before making financial decisions. We are not responsible for decisions made based on figures produced by the App.",
        ],
      },
      {
        heading: "3. Acceptable use",
        body: [
          "You agree to use the App only for lawful purposes and not to attempt to disrupt, reverse engineer for malicious purposes, or interfere with the App's normal operation, including any advertising served within it.",
        ],
      },
      {
        heading: "4. Intellectual property",
        body: [
          "The App's design, branding, cat mascot artwork, and original code are owned by us or our licensors and are protected by applicable intellectual property laws. You may use the App for its intended purpose but may not copy, redistribute, or create derivative products from its branding or content without permission.",
        ],
      },
      {
        heading: "5. Third-party content and advertising",
        body: [
          "The App displays advertisements served by third-party networks (currently Monetag; others such as Google AdSense may be added later). We do not control the content of third-party ads and are not responsible for the products, services, or content they promote. Interacting with any ad is at your own discretion and risk.",
        ],
      },
      {
        heading: "6. Disclaimer of warranties",
        body: [
          "The App is provided \"as is\" and \"as available\", without warranties of any kind, whether express or implied, including but not limited to accuracy, reliability, or fitness for a particular purpose. We do not guarantee the App will be error-free or uninterrupted.",
        ],
      },
      {
        heading: "7. Limitation of liability",
        body: [
          "To the fullest extent permitted by applicable law, we are not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the App, including any financial decisions made using its calculation results.",
        ],
      },
      {
        heading: "8. Changes to the App or these Terms",
        body: [
          "We may modify, suspend, or discontinue any part of the App, and may update these Terms from time to time. We'll update the effective date above when we do. Continued use after changes take effect means you accept the revised Terms.",
        ],
      },
      {
        heading: "9. Contact us",
        body: [`Questions about these Terms? Reach us at ${CONTACT_EMAIL}.`],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    effectiveDate: "September 15, 2026",
    intro: [
      "This Cookie Policy explains how Nekolculator uses cookies and similar local storage technologies, and the choices available to you. It should be read together with our Privacy Policy.",
    ],
    sections: [
      {
        heading: "1. What are cookies and local storage?",
        body: [
          "Cookies are small text files placed on your device by websites you visit. Local storage and session storage are similar browser technologies that let a site remember information on your device between visits (local storage) or for the current visit only (session storage). We use both, and refer to them collectively as \"cookies\" in this policy for simplicity.",
        ],
      },
      {
        heading: "2. Cookies we currently use (necessary)",
        body: [
          "These are strictly necessary for the App to remember your preferences and cannot be turned off individually — you can, however, clear them at any time through your browser's settings.",
        ],
      },
      {
        heading: "3. What we store, specifically",
        body: [
          "nekolculator-theme-id — remembers your selected cat theme (session storage).",
          "nekolculator-dark-mode — remembers your dark/light mode preference (local storage).",
          "nekolculator-muted — remembers whether sound is muted (local storage).",
          "nekolculator-language — remembers your selected language (local storage).",
          "nekolculator-cookie-consent — remembers your cookie banner choice (local storage).",
        ],
      },
      {
        heading: "4. Advertising cookies",
        body: [
          "We use the Monetag ad network (and may add others, such as Google AdSense, later). These networks may set their own cookies or use device identifiers to serve and measure ads, including personalized ads based on browsing activity. In line with applicable law, we ask for your consent to these non-essential cookies through the banner shown in the App before any ad script loads — choosing \"Necessary only\" keeps them off.",
        ],
      },
      {
        heading: "5. Managing your preferences",
        body: [
          "You can change your cookie choice at any time using the \"Cookie settings\" link in the App's footer, or by clearing your browser's stored data for this site. Most browsers also let you block cookies globally, though doing so may affect how some site preferences are remembered.",
        ],
      },
      {
        heading: "6. Changes to this policy",
        body: [
          "We may update this Cookie Policy as the App evolves, particularly as advertising features are added. We'll update the effective date above when we do.",
        ],
      },
      {
        heading: "7. Contact us",
        body: [`Questions about this policy? Reach us at ${CONTACT_EMAIL}.`],
      },
    ],
  },
};
