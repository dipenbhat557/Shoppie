interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
