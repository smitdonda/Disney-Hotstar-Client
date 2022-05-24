import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "react-bootstrap";
import HeaderBar from "../Components/HeaderBar";
import GpayPayment from "./GpayPayment";
function Subscribe() {
  let [subscribe, setSubscribe] = useState();
  const [subscribeSuper, setSubscribeSuper] = useState(false);
  let subscribeSuperStyle = () => {
    setSubscribeSuper(true);
    setPremium(false);
    setSubscribe("SUPER");
  };

  const [premium, setPremium] = useState(false);
  let subscribePremiumStyle = () => {
    setPremium(true);
    setSubscribeSuper(false);
    setSubscribe("PREMIUM");
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container text-white d-flex flex-row justify-content-center align-items-center"
        style={{ height: "90vh", marginTop: "60px" }}
      >
        <div className="border p-4">
          <div>
            <h3>Subscribe to watch all content on Disney+ Hotstar</h3>
          </div>
          <hr />
          <div>
            <div className="subscribe ">
              <div className="mt-4">
                <p>All content</p>
                <p>Watch on TV or Laptop</p>
                <p>Ads free movies and shows (except sports)</p>
                <p>Number of devices that can be logged in</p>
                <p>AMax video quality</p>
                <p>Max audio quality</p>
              </div>
              <div
                className="text-center pt-2 pb-2"
                style={{
                  backgroundColor: subscribeSuper
                    ? "rgba(255, 255, 255, 0.1)"
                    : "",
                  border: subscribeSuper ? "1px solid white" : "",
                  opacity: subscribeSuper ? "5" : "",
                }}
              >
                <p className={subscribeSuper ? "text-warning h6" : ""}>SUPER</p>
                <p>
                  <CheckIcon />
                </p>
                <p>
                  <CheckIcon />
                </p>
                <p>
                  <CloseIcon />
                </p>
                <p>2</p>
                <p>Full HD (1080p)</p>
                <p>Dolby 5.1</p>
                <Button
                  size="sm"
                  className="shadow-none"
                  onClick={() => {
                    subscribeSuperStyle();
                  }}
                >
                  Super 899/year
                </Button>
              </div>
              <div
                className="text-center pt-2 pb-2"
                style={{
                  backgroundColor: premium ? "rgba(255, 255, 255, 0.1)" : "",
                  border: premium ? "1px solid white" : "",
                  opacity: premium ? "5" : "",
                }}
              >
                <p className={premium ? "text-warning h6 " : ""}>PREMIUM</p>
                <p>
                  <CheckIcon />
                </p>
                <p>
                  <CheckIcon />
                </p>
                <p>
                  <CheckIcon />
                </p>
                <p>4</p>
                <p>Full HD (2160p)</p>
                <p>Dolby 5.1</p>
                <Button
                  size="sm"
                  className="shadow-none"
                  onClick={() => {
                    subscribePremiumStyle();
                  }}
                >
                  Premium 1499/year
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <h5>{subscribe}</h5>
            <GpayPayment />
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
