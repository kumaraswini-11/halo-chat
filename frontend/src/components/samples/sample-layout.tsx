import { AvatarExample } from "./avatar-examples";
import { ButtonExamples } from "./button-examples";
import { InputFieldExamples } from "./input-field-examples";
import { ReferanceUiLinks } from "./referance-ui-links";
import { TypographyExamples } from "./typography-examples";

// This "sample" folder is not used any where in the codebase, its just for reference and legacy purposes.
// This is a sample layout component that showcases various UI elements for demonstration purposes.
// The main purpose of this layout is to provide a structured way to display these components together for reference or testing.
export default function SampleLayout() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <TypographyExamples />
      <ButtonExamples />
      <AvatarExample />
      <InputFieldExamples />
      <ReferanceUiLinks />
    </div>
  );
}
