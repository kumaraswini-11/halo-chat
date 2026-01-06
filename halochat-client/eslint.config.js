import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "build", "src/components/ui/**"]),

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      // Best practice: auto-detect React version
      react: { version: "detect" },

      // This tells the 'import' plugin how to resolve path aliases (e.g., '@/components').
      "import/resolver": {
        typescript: true, // Use the TypeScript compiler for path resolution
      },
    },
    rules: {
      // Required if using Tanstack Form
      // "react/no-children-prop": ["error", { allowFunctions: true }],

      // Import order rule from eslint-plugin-import
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // All installed dependencies (npm packages)
            "internal", // Custom aliases like '@/components'
            "parent", // ../
            "sibling", // ./
            "index", // .
            "object", // Added common default groups
            "unknown", // This is where the CSS import falls if not explicitly handled
          ],
          // NEW CRITICAL SECTION: Defines how aliases starting with @/ are handled
          pathGroups: [
            {
              pattern: "@/**", // Targets all paths starting with @/
              group: "internal", // Assigns them to the 'internal' group
              position: "before", // Optional: ensures this pattern is prioritized
            },
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          // Add this to allow side-effect imports (like CSS) to be recognized and placed
          // It's often required when you have unassigned imports like "import 'styles.css';"
          pathGroupsExcludedImportTypes: ["builtin", "external"],
        },
      ],
    },
  },

  // This disables the formatting rules that Prettier handles.
  prettier,
]);
