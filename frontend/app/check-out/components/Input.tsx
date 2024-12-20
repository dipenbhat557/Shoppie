export function Input({labelName, type}: {labelName: string, type: string}) {
    return (
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">{labelName}</label>
            <input type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
    )
}