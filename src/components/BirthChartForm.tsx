import { useForm, Controller } from 'react-hook-form';
import type { BirthChartData } from '../types';
import LocationAutocomplete from './LocationAutocomplete';
import MoonPhaseLoader from './MoonPhaseLoader';

interface BirthChartFormProps {
  onSubmit: (data: BirthChartData) => void;
  isLoading?: boolean;
}

export default function BirthChartForm({ onSubmit, isLoading }: BirthChartFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BirthChartData>();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Moon phase loader overlay */}
      {isLoading && <MoonPhaseLoader />}
      <div className="card" style={{ padding: '1rem' }}>
        <div className="text-center mb-3 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-light mb-1 tracking-wide" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.08em' }}>
            YOUR BIRTH CHART
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
            Enter your details to begin
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-medium mb-1 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="input-field"
              placeholder=""
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-xs mt-1" style={{ color: '#8B3A3A' }}>{errors.name.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-xs font-medium mb-1 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="input-field"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
            />
            {errors.dateOfBirth && (
              <p className="text-xs mt-1" style={{ color: '#8B3A3A' }}>{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Time of Birth */}
          <div>
            <label htmlFor="timeOfBirth" className="block text-xs font-medium mb-1 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Time of Birth
            </label>
            <input
              id="timeOfBirth"
              type="time"
              className="input-field"
              {...register('timeOfBirth', { required: 'Time of birth is required' })}
            />
            {errors.timeOfBirth && (
              <p className="text-xs mt-1" style={{ color: '#8B3A3A' }}>{errors.timeOfBirth.message}</p>
            )}
          </div>

          {/* Place of Birth */}
          <div>
            <label htmlFor="placeOfBirth" className="block text-xs font-medium mb-1 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Place of Birth
            </label>
            <Controller
              name="placeOfBirth"
              control={control}
              rules={{ required: 'Place of birth is required' }}
              render={({ field }) => (
                <LocationAutocomplete
                  value={field.value || ''}
                  onChange={(location, latitude, longitude) => {
                    field.onChange(location);
                    if (latitude !== undefined && longitude !== undefined) {
                      setValue('latitude', latitude);
                      setValue('longitude', longitude);
                    }
                  }}
                  error={errors.placeOfBirth?.message}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full mt-3 sm:mt-8"
          >
            Generate Chart
          </button>
        </form>
      </div>
    </div>
  );
}
