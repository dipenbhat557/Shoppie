export function MobileHeader({title}: {title: string}) {
    return (
        <div className="text-3xl md:hidden text-center pb-4">
            {title}
        </div>
    )
}