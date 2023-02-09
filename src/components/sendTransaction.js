import { useState } from "react";
import { Button, Input } from "reactstrap";

export const SendTransaction = ({ sdk, web3, email }) => {
  const [errors, setErrors] = useState(null);
  const [toAddress, setToAddress] = useState("");
  const [value, setValue] = useState("");
  const [gas, setGas] = useState(350000);
  const [maxFee, setMaxFee] = useState(50000000000);
  const [maxFeePrio, setMaxPrio] = useState(50000000000);
  const [resp, setResp] = useState(null);

  const sendTransaction = async () => {
    console.log(sdk, web3);
    try {
      const address = await sdk.ethereum.enable();
      const nonce = await web3.eth.getTransactionCount(address[0], "latest");
      const txOb = {
        from: address[0],
        to: toAddress,
        data: "",
        value: web3.utils.toWei(value.toString(), "ether"),
        nonce,
        gas: gas,
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: maxFeePrio,
        chainId: 80001,
      };
      const sendTrx = await web3.eth.sendTransaction(txOb);
      setResp(JSON.stringify(sendTrx, null, 2));
    } catch (err) {
      setErrors(JSON.stringify(err));
    }
  };

  const txt = resp || errors || "";
  return (
    <div className="operation-wrapper">
      <h2>Send Transaction</h2>
      <div>
        <div className="input-wrapper">
          <label>To Address</label>
          <Input
            style={{ width: "100%" }}
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Matic</label>
          <Input
            style={{ width: "100%" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Gas</label>
          <Input
            style={{ width: "100%" }}
            value={gas}
            onChange={(e) => setGas(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Max Fee Per Gas</label>
          <Input
            style={{ width: "100%" }}
            value={maxFee}
            onChange={(e) => setMaxFee(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Max Priority Fee</label>
          <Input
            style={{ width: "100%" }}
            value={maxFeePrio}
            onChange={(e) => setMaxPrio(e.target.value)}
          />
        </div>
      </div>
      <div className="operation-cta">
        <Button
          color="primary"
          onClick={() => {
            sendTransaction();
          }}
        >
          Send Trx
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
