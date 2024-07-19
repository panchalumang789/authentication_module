export default function NotFound() {
  return (
    <div className="bg-[#081421] h-screen w-screen text-white">
      <div
        className="code-area"
        style={{
          position: "absolute",
          width: "320px",
          minWidth: "320px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <span style={{ color: "#777", fontStyle: "italic" }}>
          // 404 page not found.
        </span>
        <br />
        <span>
          <span style={{ color: "#d65562" }}>if </span>(
          <span style={{ color: "#4ca8ef" }}> ! </span>
          <span style={{ fontStyle: "italic", color: "#bdbdbd" }}>found </span>)
          {" {"}
        </span>
        <br />
        <span>
          <span style={{ paddingLeft: "15px", color: "#2796ec" }}>
            <i style={{ width: "10px", display: "inline-block" }}></i>throw{" "}
          </span>
          <span>
            (<span style={{ color: "#a6a61f" }}> "(╯°□°)╯︵ ┻━┻" </span>);
          </span>
          <br />
          {"} "}

          <span style={{ display: "block" }}></span>
          <span style={{ color: "#777", fontStyle: "italic" }}>
            //{" "}
            <a href="/" className="underline text-white">
              Go home !
            </a>
          </span>
        </span>
      </div>
    </div>
  );
}
