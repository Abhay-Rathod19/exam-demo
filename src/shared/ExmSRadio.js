
export const ExmSRadio = ({ ...props }) => {
    return (
        <input
            type="radio"
            name={props?.name}
            value={props?.value}
            checked={props?.checked}
            onChange={props?.onChange}
            {...props} />
    )
};
