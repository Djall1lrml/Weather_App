import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import "moment/locale/ar";
import "./index.css";
import Container from "@mui/material/Container";
let cancelaxios = null;
function App() {
  moment.locale("ar-dz");
  const [date, setdate] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });

  useEffect(() => {
    moment.locale("ar-dz"); // set the locale globally
    setdate(moment().format("MMMM Do YYYY, h:mm a"));
  }, []);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("ar");
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=36.3650&lon=6.6147&appid=46a0d43775260bad97bab7053f723d4a",
        {
          canceltoken: new axios.CancelToken((c) => {
            cancelaxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responsetemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const icon1 = response.data.weather[0].icon;
        setTemp({
          number: responsetemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${icon1}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelaxios();
    };
  }, []);
  const [locale, setlocale] = useState("ar");
  function handleclick() {
    if (locale == "en") {
      setlocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar-dz");
      setdate(moment().format("MMMM Do YYYY, h:mm a"));
    } else {
      setlocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      setdate(moment().format("MMMM Do YYYY, h:mm a"));
    }
  }
  return (
    <div style={{ display: "flex" }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*container*/}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/*card*/}
          <div
            dir={locale == "ar" ? "rtl" : "ltr"}
            style={{
              width: "100%",
              background: "rgb(28 52 91 /36%)",
              color: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/*content*/}
            <div>
              {/*city*/}

              <div
                dir={locale == "ar" ? "rtl" : "ltr"}
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center", // center the city and date
                }}
              >
                <h1 style={{ marginRight: "20px" }}>{t("Constantine")}</h1>
                <h3 style={{ marginRight: "20px" }}> {date}</h3>
              </div>
              <hr style={{ color: "white" }} />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/*degree*/}
                <div>
                  {/*nbr*/}
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1>{temp.number}</h1>
                    <img src={temp.icon} />
                  </div>
                  <h2>{t(temp.description)}</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>
                      {t("min")} : {temp.min}
                    </h3>
                    <h2> | </h2>
                    <h3>
                      {t("max")} : {temp.max}
                    </h3>
                  </div>
                </div>
                <img
                  src={temp.icon}
                  style={{
                    width: "250px",
                    height: "250px",
                    fontSize: "200px",
                    textAlign: "left !important",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            dir={locale == "ar" ? "rtl" : "ltr"}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Button
              variant="text"
              style={{ color: "white", marginTop: "20px" }}
              onClick={handleclick}
            >
              {locale == "en" ? "Arabic" : "انجليزي"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
