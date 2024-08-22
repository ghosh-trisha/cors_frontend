import { DarkThemeToggle, Flowbite } from "flowbite-react";

function DarkMode() {
  return (
    <div className="absolute top-2 right-2">
        <Flowbite>
        <DarkThemeToggle />
        </Flowbite>
    </div>
  );
}

export default DarkMode