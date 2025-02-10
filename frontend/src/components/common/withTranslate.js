import React from "react";
import { withTranslation } from "react-i18next";

const WithTranslate = (WrappedComponent) => {
  const TranslatedComponent = React.forwardRef((props, ref) => {
    const { t } = props;
    return <WrappedComponent {...props} t={t} ref={ref} />;
  });

  TranslatedComponent.displayName = `WithTranslate(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return withTranslation()(TranslatedComponent);
};

export default WithTranslate;