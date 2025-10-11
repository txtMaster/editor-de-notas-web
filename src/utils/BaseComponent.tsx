type BaseProps = {
	className?: string;
	children?: React.ReactNode;
};

export function Base<P extends object>(
	Component: React.ComponentType<P & BaseProps>
): React.FC<P & BaseProps> {
	const Wrapper: React.FC<P & BaseProps> = ({
		className = "",
		children = null,
		...rest
	}) => (
		<Component {...(rest as P)} className={className}>
			{children}
		</Component>
	);

	// para fastrefresh y  debug
	Wrapper.displayName =
		Component.displayName || Component.name || "AnonymousComponent";

	return Wrapper;
}