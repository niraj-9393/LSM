function Title({ title, subtitle }:{title:string,subtitle:string}) {
    return (
        <div className="text-center mb-10 px-4">
            
            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
                {title}
            </h2>

            {/* Accent Line */}
            <div className="w-20 h-1 mx-auto mt-3 rounded-full bg-linear-to-r from-[#10B981] via-[#059669] to-[#3B82F6]"></div>

            {/* Subtitle */}
            {subtitle && (
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default Title;