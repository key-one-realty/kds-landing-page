import React, { useState } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

const AutocompleteInput = ({register, errors, formStep, isLoaded, loadError}) => {
    const [
        autocomplete,
        setAutoComplete,
    ] = useState(null)
    

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: "initMap",
        requestOptions: {
            location: { lat: () => 25.276987, lng: () => 38.000963 }, // A central point in the GCC region
            radius: 2000 * 1000, // A radius of 2000 kilometers (adjust as needed)
            strictBounds: false, // Allow results outside of the radius if necessary
            types: ['(regions)'], // Restrict results to regions for better accuracy
        },
        debounce: 300,
    });

    const initMap = () => {
        console.log('Google Maps API loaded successfully.');
    }

    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
        console.log(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
    
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
          });
        };
    
    //   const renderSuggestions = () =>
    //     data.map((suggestion) => {
    //       const {
    //         place_id,
    //         structured_formatting: { main_text, secondary_text },
    //       } = suggestion;
    
    //       return (
    //         <li key={place_id} onClick={handleSelect(suggestion)}>
    //           <strong>{main_text}</strong> <small>{secondary_text}</small>
    //         </li>
    //       );
    //     });

        const handleLoad = (autocomplete) => {
            setAutoComplete(autocomplete)
            console.log(autocomplete);
        }


        const handlePlaceChanged = () => {
            if (autocomplete !== null) {
                const locationDetails = autocomplete.getPlace()
    
                const name = locationDetails.name;
                //variable to store the status from place details result
                const status = locationDetails.business_status;
                //variable to store the formatted address from place details result
                const formattedAddress = locationDetails.formatted_address;
                console.log(locationDetails);
                //console log all results
                console.log(`Name: ${name}`);
                console.log(`Business Status: ${status}`);
                console.log(`Formatted Address: ${formattedAddress}`);
                const location = {
                    lat: locationDetails.geometry?.location?.lat(),
                    lng: locationDetails.geometry?.location?.lng(),
                }
                console.log(`From the Gmaps, name: ${name} location: ${location.lat} and ${location.lng}`);
    
                // if (input == 1) {
                //     setLatLng(location)
                //     if (setPickupText && name) {
                //         setPickupText(name)
                //     }
                // } else {
                //     if (setLatLngDropOff) {
                //         setLatLngDropOff(location)
                //         if (setDropoffText && name) {
                //             setDropoffText(name)
                //         }
                //     }
                // }
    
            } else {
                console.log('No gmaps');
            }
        }

    // if (!isLoaded){ return null;}
//     if (!isLoaded || loadError){ 
//         console.log(loadError, isLoaded);
//         return (
//         <input
//             type="text"
//             id="location"
//             {...register("location", { required:  formStep === 2 ? "Kindly provide the location of your building" : false })}
//             aria-invalid={errors.location ? "true" : "false"}
//             className="form-control text-red-50 w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
//             placeholder="Enter your building location"
//     />);
// }




  return (
    <div>
        <div ref={ref}>
            <Autocomplete
                onLoad={handleLoad}
                onPlaceChanged={handlePlaceChanged}
            >
            <input
            // value={value}
            {...register("location", { required:  formStep === 2 ? "Kindly provide the location of your building" : false })}
            id="location"
            // onChange={handleInput}
            disabled={!ready}
            autoComplete='off'
            placeholder="Enter your building location"
            className="form-control text-red-500 w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
            />
            </Autocomplete>
        </div>
    </div>
  )
}

export default AutocompleteInput;