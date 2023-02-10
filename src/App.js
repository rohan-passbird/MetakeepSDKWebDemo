import "./App.css";
import { MetaKeep } from "metakeep";
import { useMemo, useState } from "react";
import { Input } from "reactstrap";
import Web3 from "web3";
import { Consent } from "./components/consent";
import { Sign } from "./components/sign";
import { SendTransaction } from "./components/sendTransaction";
import { TransferNFT } from "./components/transferNFT";
import Draggable from "react-draggable"; // The default
import { useCallback } from "react";

function App() {
  const [envVal, setEnvVal] = useState("dev");
  const [apiKey, setApiKey] = useState("2452849e-d6e9-40ef-bbfd-5dfdc7ce1728");
  const [rpc, setRpc] = useState("https://rpc.ankr.com/polygon_mumbai");
  const [email, setEmail] = useState("");
  const [draggableRectangleVisible, setDraggableRectangleVisible] =
    useState(false);

  const sdk = useMemo(
    () =>
      new MetaKeep({
        environment: envVal,
        appId: apiKey,
        user: { email },
        chainId: 80001,
        rpcNodeUrls: {
          80001: rpc,
        },
      }),
    [apiKey, envVal, email, rpc]
  );

  const web3 = useMemo(async () => new Web3(await sdk.ethereum), [sdk]);

  const setIframeOpacity = useCallback((opacity) => {
    const iframe = document.querySelector("#metakeep-iframe");
    if (iframe) {
      iframe.style.opacity = opacity;
    }
  }, []);

  return (
    <div className="App">
      <div className="controls">
        <div className="controls-input">
          <label>Select Env</label>
          <Input
            onChange={(e) => {
              setEnvVal(e.target.value);
            }}
            type="select"
          >
            <option value="dev">Dev</option>
            <option value="dublin">Dublin</option>
            <option value="prod">Prod</option>
            <option value="local">Local</option>
          </Input>
        </div>
        <div className="controls-input">
          <label>RPC Url</label>
          <Input
            style={{ width: "100%" }}
            value={rpc}
            onChange={(e) => setRpc(e.target.value)}
          />
        </div>
        <div className="controls-input">
          <label>Email (Optional)</label>
          <Input
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="controls-input">
          <label>APP Id</label>
          <Input
            style={{ width: "100%" }}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="controls-input">
          <label>Draggable Rectangle</label>
          <Input
            type="checkbox"
            checked={draggableRectangleVisible}
            onChange={(e) => setDraggableRectangleVisible(e.target.checked)}
          />
        </div>
        <div className="controls-input">
          <label>Iframe Opacity</label>
          <Input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            zIndex="100000"
            onChange={(e) => setIframeOpacity(e.target.value)}
          />
        </div>
      </div>

      {/* Absolutely positioned controls to the right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 100000,
        }}
      >
        <div className="controls-input">
          <label>Draggable Rectangle</label>
          <Input
            type="checkbox"
            checked={draggableRectangleVisible}
            onChange={(e) => setDraggableRectangleVisible(e.target.checked)}
          />
        </div>
        <div className="controls-input">
          <label>Iframe Opacity</label>
          <Input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            zIndex="100000"
            onChange={(e) => setIframeOpacity(e.target.value)}
          />
        </div>
      </div>

      <div className="test-app">
        <Consent sdk={sdk} />
        <Sign sdk={sdk} web3={web3} />
        <SendTransaction sdk={sdk} web3={web3} email={email} />
        <TransferNFT sdk={sdk} web3={web3} />
      </div>

      <Draggable>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            backgroundColor: "red",
            zIndex: 100000,
            display: draggableRectangleVisible ? "block" : "none",
          }}
        ></div>
      </Draggable>
    </div>
  );
}

export default App;
