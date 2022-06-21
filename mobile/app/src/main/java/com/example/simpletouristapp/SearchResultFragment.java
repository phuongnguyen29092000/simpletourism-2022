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
            Bundle savedInstanceState) {

        binding = FragmentSearchResultBinding.inflate(inflater, container, false);
        rvSearch = binding.rvSearch;
        toursApiService = new ToursApiService();
        String q = getActivity().getIntent().getStringExtra("searchResult").trim().replace(" ","-");
        Call<ToursResponse> call = toursApiService.searchTour(q);
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                if(response.code() == 200){
                    ToursResponse tourResponse = response.body();
                    tourAdapter = new TourAdapter(getContext(), tourResponse.getData(),"search");
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle(getActivity().getIntent().getStringExtra("searchResult"));
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);
                    rvSearch.setLayoutManager(new GridLayoutManager(getContext(), 2));
                    rvSearch.setAdapter(tourAdapter);
                    binding.noResult.setVisibility(View.GONE);
                }else {
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);
                    binding.noResult.setVisibility(View.VISIBLE);
                    Log.d("TAG", String.valueOf(response.code()));
                    Log.d("TAG", q);
                }
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
                ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);
            }
        });
        return binding.getRoot();

    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}