package com.example.simpletouristapp.ui.home;

import androidx.fragment.app.DialogFragment;


import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TypePlaceAdapter;
import com.example.simpletouristapp.databinding.FilterFragmentBinding;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.model.TypePlaceResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.example.simpletouristapp.ui.news.NewsViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FilterFragment extends DialogFragment {

    private FilterFragmentBinding binding;
    private RecyclerView rvTypePlace;
    private ToursApiService toursApiService;
    private TypePlaceAdapter typePlaceAdapter;

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
//        NewsViewModel domesticViewModel =
//                new ViewModelProvider(this).get(NewsViewModel.class);

        binding = FilterFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();


//        final TextView textView = binding.textNews;
//        domesticViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getContext(),R.array.contient, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerContinent.setAdapter(adapter);
        ArrayAdapter<CharSequence> adapter1 = ArrayAdapter.createFromResource(getContext(),R.array.sort_by, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerSort.setAdapter(adapter1);
        binding.dialogClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });
        binding.seekbarPriceMin.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                binding.priceMin.setText(String.valueOf(i));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
        binding.seekbarPriceMax.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                binding.priceMax.setText(String.valueOf(i)+"đ");
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
        rvTypePlace = binding.rvTypePlace;
        toursApiService = new ToursApiService();

        Call<TypePlaceResponse> call = toursApiService.getTypePlacesApi();
        call.enqueue(new Callback<TypePlaceResponse>() {
            @Override
            public void onResponse(Call<TypePlaceResponse> call, Response<TypePlaceResponse> response) {
                if(response.code() == 200){
                    TypePlaceResponse typePlaceResponse = response.body();
                    typePlaceAdapter = new TypePlaceAdapter(getActivity(),typePlaceResponse.getTypePlaces());
                    rvTypePlace.setLayoutManager(new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL,false));
                    rvTypePlace.setAdapter(typePlaceAdapter);
                }
            }

            @Override
            public void onFailure(Call<TypePlaceResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}