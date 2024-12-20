export function Header({title}: {title: string}) {
    return (
        <div className="hidden md:block text-3xl">
            {title}
        </div>
    )
}