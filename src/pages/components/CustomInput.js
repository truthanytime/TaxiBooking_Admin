

const CustomInput = ({ name, key, action, className }) => {


    return (
        <>
            <div className={className}>
                <label className="p-0 m-0">{name}</label>
                <input className="form-control" onChange={(e) => action(e, "description")} />
            </div>

        </>
    )
}