import { useForm } from 'react-hook-form';
import type { BirthChartData } from '../types';

interface BirthChartFormProps {
  onSubmit: (data: BirthChartData) => void;
  isLoading?: boolean;
}

export default function BirthChartForm({ onSubmit, isLoading }: BirthChartFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthChartData>();

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="card">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Cosmic Birth Chart
          </h1>
          <p className="text-white/70 text-sm">
            Discover your astrological blueprint
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="input-field"
              placeholder="Enter your full name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="input-field"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
            />
            {errors.dateOfBirth && (
              <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Time of Birth */}
          <div>
            <label htmlFor="timeOfBirth" className="block text-sm font-medium mb-2">
              Time of Birth
            </label>
            <input
              id="timeOfBirth"
              type="time"
              className="input-field"
              {...register('timeOfBirth', { required: 'Time of birth is required' })}
            />
            {errors.timeOfBirth && (
              <p className="text-red-400 text-sm mt-1">{errors.timeOfBirth.message}</p>
            )}
          </div>

          {/* Place of Birth */}
          <div>
            <label htmlFor="placeOfBirth" className="block text-sm font-medium mb-2">
              Place of Birth
            </label>
            <input
              id="placeOfBirth"
              type="text"
              className="input-field"
              placeholder="City, Country"
              {...register('placeOfBirth', { required: 'Place of birth is required' })}
            />
            {errors.placeOfBirth && (
              <p className="text-red-400 text-sm mt-1">{errors.placeOfBirth.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Chart...
              </span>
            ) : (
              'Generate Birth Chart'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">
          <p>Your birth chart will reveal insights about your personality,</p>
          <p>relationships, career, and life path through the stars.</p>
        </div>
      </div>
    </div>
  );
}
