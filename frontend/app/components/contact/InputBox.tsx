interface InputTypes {
    type: string,
    placeholder: string
}

export function InputBox(props: InputTypes) {
    const {type, placeholder} = props;
  return (
    <>
      <input
        type={type}
        className="bg-[#F5F5F5] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </>
  );
}
