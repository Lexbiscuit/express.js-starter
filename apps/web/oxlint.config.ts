import {defineConfig, type OxlintConfig} from "oxlint";

export default defineConfig({
  plugins: ["typescript", "import", "react", "oxc"],
  rules: {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", {allowConstantExport: true}],
  },
} as OxlintConfig);
