import { useState } from "react";
import { Button, Input } from "reactstrap";

const OPERATION_MAP = {
  signMessage: {
    title: "Enter Message",
    label: "Sign Message",
  },
  signTransaction: {
    title: "Enter Transaction Object",
    label: "Sign Transaction",
  },
  signTypedData: {
    title: "Enter Typed Data",
    label: "Sign Typed Data",
  },
};

export const Sign = ({ sdk, web3, email }) => {
  const [payload, setPayload] = useState("");
  const [errors, setErrors] = useState(null);
  const [resp, setResp] = useState(null);
  const [opr, setOpr] = useState("signMessage");
  const [reason, setReason] = useState("");

  const onSignMessage = async () => {
    try {
      const res = await sdk.signMessage(payload, reason);
      setResp(JSON.stringify(res, null, 2));
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors(JSON.stringify(err));
      setResp(null);
    }
  };

  const web3Sign = async () => {
    try {
      const address = await sdk.ethereum.enable();
      let result;
      switch (opr) {
        case "signTransaction":
          result = await web3.eth.signTransaction(
            typeof payload === "string" ? JSON.parse(payload) : payload,
            address[0]
          );
          break;
        case "signMessage":
          result = await web3.eth.sign(payload, address[0]);
          break;
        case "signTypedData":
          result = await web3.currentProvider.request({
            method: "eth_signTypedData_v4",
            params: [
              typeof payload === "string" ? JSON.parse(payload) : payload,
              address[0],
            ],
          });
          break;
        default:
          break;
      }
      setResp(JSON.stringify(result, null, 2));
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors(JSON.stringify(err));
      setResp(null);
    }
  };

  const onSignTransaction = async () => {
    try {
      const res = await sdk.signTransaction(
        typeof payload === "string" ? JSON.parse(payload) : payload,
        reason,
        email
      );
      setResp(JSON.stringify(res, null, 2));
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors(JSON.stringify(err));
      setResp(null);
    }
  };

  const onSignTypedData = async () => {
    try {
      const res = await sdk.signTypedData(
        typeof payload === "string" ? JSON.parse(payload) : payload,
        reason,
        email
      );
      setResp(JSON.stringify(res, null, 2));
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors(JSON.stringify(err));
      setResp(null);
    }
  };

  const { title, label } = OPERATION_MAP[opr];

  const onClickHandler = async () => {
    switch (opr) {
      case "signMessage":
        onSignMessage();
        break;
      case "signTransaction":
        onSignTransaction();
        break;
      case "signTypedData":
        onSignTypedData();
        break;
      default:
        console.log("Invalid operation");
    }
  };
  const txt = resp || errors || "";
  return (
    <div className="operation-wrapper">
      <h2>Sign</h2>
      <div className="input-wrapper">
        <label>Select operation</label>
        <Input
          onChange={(e) => {
            setOpr(e.target.value);
          }}
          type="select"
        >
          <option value="signMessage">Sign Message</option>
          <option value="signTransaction">Sign Transaction</option>
          <option value="signTypedData">Sign Typed Data</option>
        </Input>
      </div>
      <div>
        <label>{title}</label>
        <Input
          style={{ width: "100%", height: "150px" }}
          type="textarea"
          onChange={(e) => setPayload(e.target.value)}
          id="consentToken"
        />
        <div className="input-wrapper">
          <label>Reason</label>
          <Input
            style={{ width: "100%" }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>
      <div className="operation-cta">
        <Button color="primary" onClick={onClickHandler}>
          {label}
        </Button>
        <Button color="primary" onClick={web3Sign}>
          Web3 Sign
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
