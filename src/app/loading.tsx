export default function loading() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber/40" />
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-moss" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-moss">T</span>
                </div>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                Loading ToolHive...
            </p>
        </div>
    );
}