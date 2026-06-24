import { useWatch, useFormContext } from "react-hook-form";
import { useGetList } from "react-admin";
import {
  Autocomplete,
  TextField as MuiTextField,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Speaker {
  id: number;
  fullName: string;
}

export const SpeakersSelectInput = () => {
  const { setValue } = useFormContext();
  const rawSpeakers = useWatch({ name: "speakers" });

  const { data: allSpeakers = [], isLoading } = useGetList<Speaker>(
    "speakers",
    {
      pagination: { page: 1, perPage: 200 },
      sort: { field: "fullName", order: "ASC" },
    },
  );

  const initialIds: number[] = Array.isArray(rawSpeakers)
    ? rawSpeakers
        .map((s: unknown): number | null => {
          if (typeof s === "object" && s !== null) {
            const obj = s as Record<string, unknown>;
            const nested = obj?.speaker as Record<string, unknown> | undefined;
            const raw = nested?.id ?? obj?.id ?? null;
            return typeof raw === "number" ? raw : null;
          }
          return typeof s === "number" ? s : null;
        })
        .filter((id): id is number => id !== null)
    : [];

  const [selected, setSelected] = useState<Speaker[]>([]);

  useEffect(() => {
    if (allSpeakers.length && initialIds.length && selected.length === 0) {
      const initial = allSpeakers.filter((s) => initialIds.includes(s.id));
      setSelected(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSpeakers]);

  const handleChange = (_: unknown, value: Speaker[]) => {
    setSelected(value);
    setValue(
      "speakerIds",
      value.map((s) => s.id),
      { shouldDirty: true },
    );
  };

  if (isLoading) return <CircularProgress size={24} />;

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Autocomplete
        multiple
        options={allSpeakers}
        getOptionLabel={(o) => o.fullName}
        value={selected}
        onChange={handleChange}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const tagProps = getTagProps({ index });
            return (
              <Chip
                {...tagProps}
                key={option.id}
                label={option.fullName}
              />
            );
          })
        }
        renderInput={(params) => (
          <MuiTextField
            {...params}
            label="Speakers *"
            helperText="At least one speaker required"
          />
        )}
      />
    </Box>
  );
};