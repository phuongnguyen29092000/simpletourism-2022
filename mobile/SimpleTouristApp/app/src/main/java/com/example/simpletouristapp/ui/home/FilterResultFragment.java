package com.example.simpletouristapp.ui.home;

import androidx.fragment.app.DialogFragment;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.FilterResultFragmentBinding;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.example.simpletouristapp.ui.news.NewsViewModel;

import java.util.HashMap;
import java.util.HashSet;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FilterResultFragment extends DialogFragment {

    private FilterResultFragmentBinding binding;
    private HashMap<String, String> params;
    private RecyclerView rvFilterResult;
    private ToursApiService toursApiService;
    private TourAdapter tourAdapter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(getArguments() != null){
            params = (HashMap<String, String>) getArguments().getSerializable("params");
        }
        setStyle(DialogFragment.STYLE_NORMAL, R.style.DialogFilter);

    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FilterResultFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        rvFilterResult = binding.rvFilterResult;
        toursApiService = new ToursApiService();

        binding.dialogFilterClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });

        Call<ToursResponse> call = toursApiService.getToursFilter(params.get("continent"),params.get("typeplace")
                ,params.get("sort"),Integer.parseInt(params.get("priceMin")),Integer.parseInt(params.get("priceMin")));
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                if(response.code() == 200){
                    ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                    tourAdapter = new TourAdapter(getContext(),tourResponse.getData(),"filter");
                    rvFilterResult.setLayoutManager(new GridLayoutManager(getContext(),2));
                    rvFilterResult.setAdapter(tourAdapter);
                }else {
                    tourAdapter = new TourAdapter(getContext(),null,null);
                    rvFilterResult.setAdapter(tourAdapter);
                }
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
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