
export const ExmLabel = ({ children, ...props }) => {
    return (
        <label {...props} className="d-block">
            {children}
        </label>
    )
}
