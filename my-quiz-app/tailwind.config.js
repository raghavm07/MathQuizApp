/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@shadcn/ui/dist/**/*.{js,jsx,ts,tsx}", // Add this line to include ShadCN components
];
export const theme = {
  extend: {},
};
export const plugins = [];
