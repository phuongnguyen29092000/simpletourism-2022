package com.example.simpletouristapp.ui.home;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import com.example.simpletouristapp.FilterResultActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TypePlaceAdapter;
import com.example.simpletouristapp.databinding.FilterFragmentBinding;
import com.example.simpletouristapp.model.TypePlaceResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.google.android.material.slider.LabelFormatter;
import com.google.android.material.slider.RangeSlider;

import java.text.NumberFormat;
import java.util.Currency;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FilterFragment extends DialogFragment {

    private FilterFragmentBinding binding;
    private RecyclerView rvTypePlace;
    private ToursApiService toursApiService;
    private TypePlaceAdapter typePlaceAdapter;
    private Set<String> selectedTypePlace;
    private HashMap<String, String> params;
    private float priceMin;
    private float priceMax;

    static FilterFragment newInstance() {
        return new FilterFragment();
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setStyle(DialogFragment.STYLE_NORMAL, R.style.DialogFilter);
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FilterFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        selectedTypePlace = new HashSet<>();
        params = new HashMap<>();
        HashMap<String, String> continents = new HashMap<String, String>();
        final String[] typePlace = {""};
        final String[] continent = {""};
        final String[] sort = {""};

        continents.put("Châu Á", "asia");
        continents.put("Châu Âu", "europe");
        continents.put("Châu Mỹ", "americas");
        continents.put("Châu Phi", "africa");
        continents.put("Châu Úc", "australia");

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getContext(), R.array.contient, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerContinent.setAdapter(adapter);

        ArrayAdapter<CharSequence> adapter1 = ArrayAdapter.createFromResource(getContext(), R.array.sort_by, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerSort.setAdapter(adapter1);

        binding.rangeSlider.setLabelFormatter(new LabelFormatter() {
            @NonNull
            @Override
            public String getFormattedValue(float value) {
                Locale lc = new Locale("nv", "VN");
                NumberFormat numberFormat = NumberFormat.getCurrencyInstance();
                numberFormat.setMaximumFractionDigits(0);
                numberFormat.setCurrency(Currency.getInstance(lc));
                return numberFormat.format(value);
            }
        });
        priceMin = 0;
        priceMax = 50000000;
        binding.rangeSlider.addOnSliderTouchListener(new RangeSlider.OnSliderTouchListener() {
            @SuppressLint("RestrictedApi")
            @Override
            public void onStartTrackingTouch(@NonNull RangeSlider slider) {
                Log.d("start", String.valueOf(slider.getValues()));
            }

            @SuppressLint("RestrictedApi")
            @Override
            public void onStopTrackingTouch(@NonNull RangeSlider slider) {
                Log.d("end", String.valueOf(slider.getValues()));
                priceMin = slider.getValues().get(0);
                priceMax = slider.getValues().get(1);
                Log.d("end", String.valueOf((int) priceMin));
                Log.d("end", String.valueOf((int) priceMax));
            }
        });

        binding.spinnerContinent.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                Adapter adapter2 = adapterView.getAdapter();
                continent[0] = (String) adapter2.getItem(i);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        binding.spinnerSort.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                Adapter adapter2 = adapterView.getAdapter();
                sort[0] = (String) adapter2.getItem(i);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });


        binding.dialogClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });
        rvTypePlace = binding.rvTypePlace;
        toursApiService = new ToursApiService();

        Call<TypePlaceResponse> call = toursApiService.getTypePlacesApi();
        call.enqueue(new Callback<TypePlaceResponse>() {
            @Override
            public void onResponse(Call<TypePlaceResponse> call, Response<TypePlaceResponse> response) {
                if (response.code() == 200) {
                    TypePlaceResponse typePlaceResponse = response.body();
                    typePlaceAdapter = new TypePlaceAdapter(getActivity(), typePlaceResponse.getTypePlaces(), selectedTypePlace);
                    rvTypePlace.setLayoutManager(new StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL));
                    rvTypePlace.setAdapter(typePlaceAdapter);
                }
            }

            @Override
            public void onFailure(Call<TypePlaceResponse> call, Throwable t) {
                Log.d("TAG", t.getMessage());
            }
        });

        binding.dialogAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                for (String i : continents.keySet()) {
                    if (i.equals(continent[0])) {
                        params.put("continent", continents.get(i));
                    }
                }
                for (String place : selectedTypePlace) {
                    typePlace[0] += place + ",";
                }
                params.put("typeplace", typePlace[0].replaceAll(",$", ""));
                if (sort[0].equals("Giá")) {
                    params.put("sort", "price");
                } else {
                    params.put("sort", "rating");
                }
                params.put("priceMin", String.valueOf((int) priceMin));
                params.put("priceMax", String.valueOf((int) priceMax));
                if (binding.discount.isChecked()) {
                    params.put("discount", "true");
                } else {
                    params.put("discount", "");
                }

                Bundle bundle = new Bundle();
                bundle.putSerializable("params", params);
                Intent intent = new Intent(getActivity(), FilterResultActivity.class);
                intent.putExtras(bundle);
                startActivity(intent);
                typePlace[0] = "";
            }
        });
        return root;
    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}