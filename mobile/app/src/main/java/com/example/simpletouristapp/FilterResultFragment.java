package com.example.simpletouristapp;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.FragmentFilterResultBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.ToursApiService;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FilterResultFragment extends Fragment {

    private FragmentFilterResultBinding binding;

    private HashMap<String, String> params;
    private RecyclerView rvFilterResult;
    private ToursApiService toursApiService;
    private TourAdapter tourAdapter;

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {

        binding = FragmentFilterResultBinding.inflate(inflater, container, false);


        Bundle bundle = new Bundle();
        bundle = getActivity().getIntent().getExtras();
        params = (HashMap<String, String>) bundle.getSerializable("params");

        rvFilterResult = binding.rvFilterResult;
        toursApiService = new ToursApiService();


        Call<ToursResponse> call = toursApiService.getToursFilter(params.get("continent"), params.get("typeplace")
                , params.get("sort"), Integer.parseInt(params.get("priceMin")), Integer.parseInt(params.get("priceMax")), params.get("discount"));
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                if (response.code() == 200) {
                    ToursResponse tourResponse = response.body();
                    tourAdapter = new TourAdapter(getContext(), tourResponse.getData(), "filter");
                    rvFilterResult.setLayoutManager(new GridLayoutManager(getContext(), 2));
                    rvFilterResult.setAdapter(tourAdapter);
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle("Filter Result");
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);
                    binding.noResult.setVisibility(View.GONE);
                } else {
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle("Filter Result");
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                    ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);
                    tourAdapter = new TourAdapter(getContext(), null, null);
                    rvFilterResult.setAdapter(tourAdapter);
                    binding.noResult.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG", t.getMessage());
            }
        });

        return binding.getRoot();

    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            getActivity().finish();
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}