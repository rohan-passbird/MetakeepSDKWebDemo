import { useState } from "react";
import { Button, Input } from "reactstrap";
import abi from "../abi";

export const TransferNFT = ({ sdk, web3 }) => {
  const [errors, setErrors] = useState(null);
  const [toAddress, setToAddress] = useState("");
  const [contractAddress, setContractAddr] = useState("");
  const [maxFee, setMaxFee] = useState(100000);
  const [resp, setResp] = useState(null);
  const [tokenId, setTokenId] = useState("");

  const sendTransaction = async () => {
    try {
      const address = await sdk.ethereum.enable();
      const contract = new web3.eth.Contract(abi.abi, contractAddress);
      const trx = await contract.methods
        .safeTransferFrom(address[0], toAddress, tokenId)
        .send({
          from: address[0],
          gas: maxFee,
        });

      setResp(JSON.stringify(trx, null, 2));
      setErrors(null);
    } catch (Err) {
      setResp(null);
      setErrors(JSON.stringify(Err));
      console.log(Err);
    }
  };

  const txt = resp || errors || "";
  return (
    <div className="operation-wrapper">
      <h2>Transfer NFT</h2>
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
          <label>Contract Address</label>
          <Input
            style={{ width: "100%" }}
            value={contractAddress}
            onChange={(e) => setContractAddr(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Token Id</label>
          <Input
            style={{ width: "100%" }}
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>Gas</label>
          <Input
            style={{ width: "100%" }}
            value={maxFee}
            onChange={(e) => setMaxFee(e.target.value)}
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
          Transfer NFT
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
