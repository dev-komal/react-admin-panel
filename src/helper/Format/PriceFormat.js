import { forwardRef } from "react";
import CurrencyInput from "react-currency-input-field";

const EuroNumberFormat = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  const handleChange = (value, name, values) => {
    // If the value is a valid number, format it to have two decimal places
    let formattedValue = "";
    if (!isNaN(parseFloat(value))) {
      if (props?.rows?.format === "European") {
        // For European format, replace "." with "," before formatting
        formattedValue = parseFloat(value.replace(",", ".")).toFixed(2);
      } else {
        // For USD format, directly format the value with two decimal places
        formattedValue = parseFloat(value).toFixed(2);
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

EuroNumberFormat.displayName = "EuroNumberFormat";

export default EuroNumberFormat;

export const formatCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat(
    currency == "EUR" ? "de-DE" : "en-US",
    {
      currency: currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
    },
  );
  const formattedValue = formatter.format(value);
  return formattedValue;
};
