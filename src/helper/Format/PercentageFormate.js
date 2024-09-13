import { forwardRef } from "react";
import CurrencyInput from "react-currency-input-field";

const EuroNumberPercentageFormat = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  const handleChange = (value, name, values) => {
    // If the value is a valid number, format it to have two decimal places
    let formattedValue = "";
    if (!isNaN(parseFloat(value))) {
      if (props?.rows?.format === "European") {
        let numericValue = parseFloat(value.replace(",", ".")).toFixed(2);

        if (numericValue > 100) {
          numericValue = 100;
        }

        if (numericValue === 100) {
          formattedValue = "100.00";
        }

        formattedValue = numericValue;
      } else {
        let numericValue = parseFloat(value).toFixed(2);

        if (numericValue > 100) {
          numericValue = 100;
        }

        if (numericValue === 100) {
          formattedValue = "100.00";
        }

        // For USD format, directly format the value with two decimal places
        formattedValue = numericValue;
      }
    }
    onChange(formattedValue, name, values);
  };

  return (
    <>
      <CurrencyInput
        {...other}
        ref={ref}
        style={{ width: "100%" }}
        decimalsLimit={2}
        allowNegativeValue={false}
        fixedDecimalLength={2}
        onValueChange={(value, name, values) =>
          handleChange(value, name, values)
        }
        allowDecimals={true}
        disableAbbreviations={true}
        intlConfig={{
          locale: props?.rows?.format == "European" ? "de-DE" : "en-US",
        }}
      />
    </>
  );
});

EuroNumberPercentageFormat.displayName = "EuroNumberPErcentageFormat";

export default EuroNumberPercentageFormat;
