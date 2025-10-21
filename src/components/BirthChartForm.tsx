import { useForm, Controller } from 'react-hook-form';
import type { BirthChartData } from '../types';
import LocationAutocomplete from './LocationAutocomplete';

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
      <div className="card">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl font-light mb-2 tracking-wide" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.08em' }}>
            YOUR BIRTH CHART
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
            Enter your details to begin
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
            <label htmlFor="dateOfBirth" className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
            <label htmlFor="timeOfBirth" className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
            <label htmlFor="placeOfBirth" className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-6 sm:mt-8"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--color-surface)' }}>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Chart'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
