import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type PasswordFieldProps = {
  label: string;
  name: string;
  id: string;
};

export default function PasswordField({ label, name, id }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeSlashIcon : EyeIcon;

  return (
    <div className="relative">
      <label htmlFor={id}>{label}</label>

      <input
        className="w-full"
        type={visible ? "text" : "password"}
        name={name}
        id={id}
      />

      <Icon
        onClick={() => setVisible(v => !v)}
        className="w-6 h-6 absolute right-0 bottom-3 hover:cursor-pointer"
      />
    </div>
  );
}
