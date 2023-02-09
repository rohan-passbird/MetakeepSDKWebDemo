import { useState } from "react";
import { Button, Input } from "reactstrap";

export const Consent = ({ sdk }) => {
  const [payload, setPayload] = useState("");
  const [errors, setErrors] = useState(null);
  const [resp, setResp] = useState(null);
  const onClick = async () => {
    try {
      const res = await sdk.getConsent(payload);
      setResp(JSON.stringify(res, null, 2));
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors(JSON.stringify(err));
      setResp(null);
    }
  };
  const txt = resp || errors || "";
  return (
    <div className="operation-wrapper">
      <h2>Consent</h2>
      <div>
        <label>Enter Token</label>
        <Input
          style={{ width: "100%", height: "150px" }}
          type="textarea"
          onChange={(e) => setPayload(e.target.value)}
          id="consentToken"
        />
      </div>
      <div className="operation-cta">
        <Button color="primary" onClick={onClick}>
          Get Consent
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className="response">
          <div>{txt}</div>
        </div>
      </div>
    </div>
  );
};
