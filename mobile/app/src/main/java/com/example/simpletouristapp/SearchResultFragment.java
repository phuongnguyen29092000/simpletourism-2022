package com.example.simpletouristapp;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.FragmentSearchResultBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.ToursApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchResultFragment extends Fragment {

    private FragmentSearchResultBinding binding;
    private RecyclerView rvSearch;
    private TourAdapter tourAdapter;
    private ToursApiService toursApiService;

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {

        binding = FragmentSearchResultBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        rvSearch = binding.rvSearch;
        toursApiService = new ToursApiService();


        Call<ToursResponse> call = toursApiService.getDomesticToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG", response.code() + "");
                ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                tourAdapter = new TourAdapter(getContext(), tourResponse.getData(),"search");
                tourAdapter.initData();

                if (!getActivity().getIntent().getStringExtra("searchResult").isEmpty()) {
                    tourAdapter.getFilter().filter(getActivity().getIntent().getStringExtra("searchResult"));
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle(getActivity().getIntent().getStringExtra("searchResult"));
                }
                rvSearch.setLayoutManager(new GridLayoutManager(getContext(), 2));
                rvSearch.setAdapter(tourAdapter);
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