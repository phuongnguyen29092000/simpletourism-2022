package com.example.simpletouristapp.ui.international;

import androidx.annotation.Nullable;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import androidx.annotation.NonNull;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.InternationalFragmentBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.example.simpletouristapp.ui.news.NewsViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class InternationalFragment extends Fragment {

    private InternationalFragmentBinding binding;
    private RecyclerView rvInternationalTour;
    private ToursApiService toursApiService;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
//        InternationalViewModel internationalViewModel =
//                new ViewModelProvider(this).get(InternationalViewModel.class);

        binding = InternationalFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        rvInternationalTour = binding.rvItemInternationalTours;

        toursApiService = new ToursApiService();

        Call<ToursResponse> call = toursApiService.getInternationalToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG",response.code()+"");
                ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                TourAdapter tourAdapter = new TourAdapter(getContext(),tourResponse.getData());
                rvInternationalTour.setLayoutManager(new GridLayoutManager(getContext(),2));
                rvInternationalTour.setAdapter(tourAdapter);
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