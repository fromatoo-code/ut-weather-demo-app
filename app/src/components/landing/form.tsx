import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';

import NumberField from '@src/components/common/numberField';
import type { CityOption } from '@src/hooks/useLocationForm';

type LocationFormProps = Readonly<{
  city: string;
  latitude: number | null;
  longitude: number | null;
  cityDisabled: boolean;
  coordinatesDisabled: boolean;
  canSearch: boolean;
  searching: boolean;
  cityOptions: CityOption[];
  error: string | null;
  onCityChange: (value: string) => void;
  onLatitudeChange: (value: number | null) => void;
  onLongitudeChange: (value: number | null) => void;
  onSearch: () => void;
  onClear: () => void;
  onDismissCityOptions: () => void;
  onSelectCityOption: (option: CityOption) => void;
}>;

export function LocationForm({
  city,
  latitude,
  longitude,
  cityDisabled,
  coordinatesDisabled,
  canSearch,
  searching,
  cityOptions,
  error,
  onCityChange,
  onLatitudeChange,
  onLongitudeChange,
  onSearch,
  onClear,
  onDismissCityOptions,
  onSelectCityOption,
}: LocationFormProps) {
  const { t, i18n } = useTranslation();
  const numberLocale = i18n.resolvedLanguage === 'et' ? 'et-EE' : 'en-US';

  return (
    <>
      <Card sx={{ width: '100%', maxWidth: 560 }}>
        <CardContent>
          <Form
            onSubmit={(event) => {
              event.preventDefault();

              if (canSearch && !searching) {
                onSearch();
              }
            }}
          >
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box
                component='fieldset'
                sx={{
                  border: 0,
                  m: 0,
                  p: 0,
                  width: '100%',
                }}
              >
                <TextField
                  id='city'
                  label={t('form.city')}
                  variant='outlined'
                  value={city}
                  onChange={(event) => onCityChange(event.target.value)}
                  disabled={cityDisabled}
                  fullWidth
                />
              </Box>
              <Box
                component='fieldset'
                sx={{
                  border: 0,
                  m: 0,
                  p: 0,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                  },
                  width: '100%',
                  gap: 2,
                  '& > :not(style)': { width: '100%' },
                }}
              >
                <NumberField
                  label={t('form.latitude')}
                  size='small'
                  min={-90}
                  max={90}
                  locale={numberLocale}
                  value={latitude}
                  onValueChange={onLatitudeChange}
                  disabled={coordinatesDisabled}
                />
                <NumberField
                  label={t('form.longitude')}
                  size='small'
                  min={-180}
                  max={180}
                  locale={numberLocale}
                  value={longitude}
                  onValueChange={onLongitudeChange}
                  disabled={coordinatesDisabled}
                />
              </Box>
              <Box>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  disabled={!canSearch || searching}
                >
                  {t('form.search')}
                </Button>
              </Box>
            <Box>
              <Button type='button' variant='outlined' onClick={onClear} fullWidth>
                {t('form.clear')}
                </Button>
              </Box>
            </Box>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={cityOptions.length > 0} onClose={onDismissCityOptions} fullWidth maxWidth='sm'>
        <DialogTitle>{t('form.selectCity')}</DialogTitle>
        <DialogContent>
          <List sx={{ p: 0 }}>
            {cityOptions.map((option) => (
              <ListItemButton key={option.id} onClick={() => onSelectCityOption(option)}>
                <ListItemText
                  primary={option.name}
                  secondary={[option.admin1, option.country].filter(Boolean).join(', ')}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
