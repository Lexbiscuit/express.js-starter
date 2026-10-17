import {defineConfig, type OxlintConfig} from "oxlint";

export default defineConfig({
  plugins: ["typescript", "import", "node", "unicorn", "oxc"],
} as OxlintConfig);
