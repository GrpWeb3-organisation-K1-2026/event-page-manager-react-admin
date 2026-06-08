import { useWatch, useFormContext } from "react-hook-form";
import { useGetList } from "react-admin";
import { Autocomplete, TextField as MuiTextField, Chip, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface Speaker {
  id: number;
  fullName: string;
}

export const SpeakersSelectInput = () => {
  const { setValue } = useFormContext();
  const rawSpeakers = useWatch({ name: "speakers" });

  const { data: allSpeakers = [], isLoading } = useGetList<Speaker>("speakers", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "fullName", order: "ASC" },
  });

  const initialIds: number[] = Array.isArray(rawSpeakers)
    ? rawSpeakers.map((s: any) => s?.speaker?.id ?? s?.id ?? s).filter(Boolean)
    : [];

  const [selected, setSelected] = useState<Speaker[]>([]);

  useEffect(() => {
    if (allSpeakers.length && initialIds.length && selected.length === 0) {
      const initial = allSpeakers.filter((s) => initialIds.includes(s.id));
      setSelected(initial);
    }
  }, [allSpeakers]);

  const handleChange = (_: unknown, value: Speaker[]) => {
    setSelected(value);
    setValue("speakerIds", value.map((s) => s.id), { shouldDirty: true });
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
          value.map((option, index) => (
            <Chip label={option.fullName} {...getTagProps({ index })} />
          ))
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