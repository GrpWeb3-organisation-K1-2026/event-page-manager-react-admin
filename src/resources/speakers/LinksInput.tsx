import { useWatch, useFormContext } from "react-hook-form";
import { Box, TextField as MuiTextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

export const LinksInput = () => {
  const { setValue } = useFormContext();
  const links = useWatch({ name: "links" }) ?? {};

  const [entries, setEntries] = useState<{ key: string; value: string }[]>(
    Object.entries(links).map(([key, value]) => ({ key, value: value as string }))
  );

  useEffect(() => {
    const obj = Object.fromEntries(
      entries.filter((e) => e.key.trim()).map((e) => [e.key.trim(), e.value])
    );
    setValue("links", obj, { shouldDirty: true });
  }, [entries, setValue]);

  const add = () => setEntries((prev) => [...prev, { key: "", value: "" }]);
  const remove = (i: number) => setEntries((prev) => prev.filter((_, idx) => idx !== i));
  const update = (i: number, field: "key" | "value", val: string) =>
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)));

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 1, fontWeight: "bold", fontSize: 14, color: "text.secondary" }}>
        External links (e.g. twitter, linkedin, website)
      </Box>
      {entries.map((entry, i) => (
        <Box key={i} sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}>
          <MuiTextField
            size="small"
            label="Label (e.g. twitter)"
            value={entry.key}
            onChange={(e) => update(i, "key", e.target.value)}
            sx={{ width: 180 }}
          />
          <MuiTextField
            size="small"
            label="URL"
            value={entry.value}
            onChange={(e) => update(i, "value", e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton onClick={() => remove(i)} size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={add} size="small" variant="outlined">
        Add link
      </Button>
    </Box>
  );
};