import type { Control } from "react-hook-form";
import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";

import { Fieldset } from "..";

import FormInput from "./FormInput";

import type { TFormField } from "./FormAdapters";

import type { IFormGroup } from "./index";

interface IFormFieldsProps {
    groups?: IFormGroup[];
    formFields: TFormField[];
    groupVariant: "fieldset" | "card";
    fieldsVariant: "filled" | "outlined" | "standard";
    columnSx: SxProps;
    columnCount: number;
    onInputChange: (name: string, value: any) => void;
    control: Control<any>;
    sx?: SxProps;
}

export default function FormFields({
    groups,
    formFields,
    groupVariant,
    fieldsVariant,
    columnSx,
    columnCount,
    onInputChange,
    control,
    sx = {},
}: IFormFieldsProps) {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", ...sx }}>
            {groups?.length
                ? groups.map((g) => {
                      return (
                          <Fieldset
                              key={"group" + g.name}
                              variant={groupVariant}
                              label={g.title}
                              sx={{ width: "100%", mb: 2 }}
                          >
                              {formFields
                                  .filter((f) => f?.group === g.name)
                                  .map((formField: TFormField, index) => {
                                      const variant = formField?.variant ? formField.variant : fieldsVariant;
                                      let sx: SxProps = {};
                                      if (variant === "outlined") {
                                          sx = { ...columnSx, mb: 1 };
                                      } else {
                                          sx = { ...columnSx, mt: index === 0 ? 0 : 2 };
                                      }
                                      if (formField?.hidden) {
                                          return null;
                                      }
                                      return (
                                          <Box
                                              sx={sx}
                                              key={formField.name}
                                          >
                                              <FormInput
                                                  fieldsVariant={fieldsVariant}
                                                  onInputChange={onInputChange}
                                                  control={control}
                                                  {...formField}
                                              />
                                          </Box>
                                      );
                                  })}
                          </Fieldset>
                      );
                  })
                : formFields.map((formField: TFormField, index) => {
                      const variant = formField?.variant ? formField.variant : fieldsVariant;
                      let sx: SxProps = {};
                      if (variant === "outlined") {
                          sx = { ...columnSx, mb: 1.5 };
                      } else {
                          sx = { ...columnSx, mt: index === 0 && columnCount === 1 ? 0 : 2 };
                      }
                      if (formField?.hidden) {
                          return null;
                      }
                      return (
                          <Box
                              sx={sx}
                              key={formField.name}
                          >
                              <FormInput
                                  fieldsVariant={fieldsVariant}
                                  onInputChange={onInputChange}
                                  control={control}
                                  {...formField}
                              />
                          </Box>
                      );
                  })}
        </Box>
    );
}
