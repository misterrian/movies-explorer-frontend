import "./FormBottom.css";

export default function FormBottom({message, children}) {
    return (
        <div className="form-bottom">
            <p className="form-bottom__message">{message}</p>
            {children}
        </div>
    );
}
