package com.example.simpletouristapp.ui.home;

import androidx.fragment.app.DialogFragment;


import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.simpletouristapp.FilterResultActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TypePlaceAdapter;
import com.example.simpletouristapp.databinding.FilterFragmentBinding;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.model.TypePlaceResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.example.simpletouristapp.ui.news.NewsViewModel;

import java.util.HashMap;
import java.util.HashSet;
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

        selectedTypePlace = new HashSet<>();
        params = new HashMap<>();
        HashMap<String,String> continents = new HashMap<String, String>();
        final String[] typePlace = {""};
        final String[] continent = {""};
        final String[] sort = {""};

        continents.put("Châu Á","asia");
        continents.put("Châu Âu","europe");
        continents.put("Châu Mỹ","americas");
        continents.put("Châu Phi","africa");
        continents.put("Châu Úc","australia");

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getContext(),R.array.contient, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerContinent.setAdapter(adapter);

        ArrayAdapter<CharSequence> adapter1 = ArrayAdapter.createFromResource(getContext(),R.array.sort_by, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerSort.setAdapter(adapter1);

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

        binding.seekbarPriceMin.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                binding.priceMin.setText(String.valueOf(i)+"đ");

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
                    typePlaceAdapter = new TypePlaceAdapter(getActivity(),typePlaceResponse.getTypePlaces(),selectedTypePlace);
                    rvTypePlace.setLayoutManager(new StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL));
                    rvTypePlace.setAdapter(typePlaceAdapter);
                }
            }

            @Override
            public void onFailure(Call<TypePlaceResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });

        binding.dialogAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String priceMin = binding.priceMin.getText().toString().substring(0, binding.priceMin.getText().toString().lastIndexOf("đ"));
                String priceMax = binding.priceMax.getText().toString().substring(0, binding.priceMax.getText().toString().lastIndexOf("đ"));
                if(Integer.parseInt(priceMin)>Integer.parseInt(priceMax)){
                    binding.validatePrice.setText("Giá đầu phải nhỏ hơn giá cuối");
                    binding.validatePrice.setVisibility(View.VISIBLE);

                }else {
                    binding.validatePrice.setVisibility(View.GONE);
                    for(String i : continents.keySet()){
                        if(i.equals(continent[0])){
                            params.put("continent",continents.get(i));
                        }
                    }
                    for (String place: selectedTypePlace){
                        typePlace[0] += place + ",";
                    }
                    params.put("typeplace",typePlace[0].replaceAll(",$",""));
                    if(sort[0].equals("Giá")){
                        params.put("sort","price");
                    }else {
                        params.put("sort","rating");
                    }
                    params.put("priceMin",priceMin);
                    params.put("priceMax",priceMax);
                    if(binding.discount.isChecked()){
                        params.put("discount","true");
                    }else {
                        params.put("discount","false");
                    }

                    Bundle bundle = new Bundle();
                    bundle.putSerializable("params", params);
//                FilterResultFragment filterResultFragment = new FilterResultFragment();
//                filterResultFragment.setArguments(bundle);
//                filterResultFragment.show(getParentFragmentManager(),"FilterResult");
                    Intent intent = new Intent(getActivity(), FilterResultActivity.class);
                    intent.putExtras(bundle);
                    startActivity(intent);
                    typePlace[0] = "";
                }

            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}