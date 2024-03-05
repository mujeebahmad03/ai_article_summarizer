import { Option, Select } from "@material-tailwind/react";
import ISO6391 from "iso-639-1";
import PropTypes from "prop-types";

const SupportedLanguages = ({ value, onChange, name }) => {
  const supportedLanguages = [
    "zh",
    "es",
    "en",
    "hi",
    "ar",
    "pt",
    "bn",
    "ru",
    "ja",
    "pa",
    "de",
    "jv",
    "id",
    "te",
    "vi",
    "ko",
    "fr",
    "mr",
    "ta",
    "tr",
    "it",
    "fa",
    "ur",
    "uk",
    "gu",
    "pl",
    "ro",
    "nl",
    "el",
    "sv",
    "hu",
    "fi",
    "my",
    "th",
    "ca",
    "he",
    "am",
    "lt",
    "sk",
  ];

  return (
    <div className="w-72 mt-4">
      <Select
        label="Select Language"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        name={name}
        value={value}
        onChange={onChange}
      >
        {supportedLanguages.map((code) => (
          <Option key={code} value={code}>
            {ISO6391.getName(code)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

SupportedLanguages.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default SupportedLanguages;
