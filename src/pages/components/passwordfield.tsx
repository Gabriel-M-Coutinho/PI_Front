import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
//tu tem que colocar o icone em import e ai você consegue usar ele

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
      <label className="block text-lg font-semibold" htmlFor={id}>{label}</label>

      <input
        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500"
        type={visible ? "text" : "password"}
        name={name}
        id={id}
      />

      <Icon
        onClick={() => setVisible(v => !v)}
        className="w-6 h-6 absolute right-3 bottom-2 hover:cursor-pointer"
      />
    </div>
  );
}
