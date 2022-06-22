package com.example.simpletouristapp.ui.international;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.InternationalFragmentBinding;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.repository.TourRepository;
import com.example.simpletouristapp.service.ToursApiService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class InternationalFragment extends Fragment {

    private InternationalFragmentBinding binding;
    private RecyclerView rvInternationalTour;
    private ToursApiService toursApiService;
    private InternationalViewModel internationalViewModel;
    private TourRepository tourRepository;
    private List<Tour> tours;
    private TourAdapter tourAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        internationalViewModel =
                new ViewModelProvider(this).get(InternationalViewModel.class);

        binding = InternationalFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        rvInternationalTour = binding.rvItemInternationalTours;

        tours = new ArrayList<>();
        tourRepository = new TourRepository(getActivity().getApplication());
        tourAdapter = new TourAdapter(getContext(), tours, "international");
        rvInternationalTour.setLayoutManager(new GridLayoutManager(getContext(), 2));
        internationalViewModel.getInternationalTours().observe(getViewLifecycleOwner(), new Observer<List<Tour>>() {
            @Override
            public void onChanged(List<Tour> tourList) {
                tourAdapter.getTours(tourList);
                rvInternationalTour.setAdapter(tourAdapter);
            }
        });
        getInternationalTours();
        return root;
    }

    public void getInternationalTours() {
        toursApiService = new ToursApiService();

        Call<ToursResponse> call = toursApiService.getInternationalToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG", response.code() + "");
                ToursResponse tourResponse = response.body();
                tourRepository.deleteInternationalTour();
                for (Tour tour : tourResponse.getData()
                ) {
                    tour.setCompanyName(tour.getOwner().getCompanyName());
                    tours.add(tour);
                }
                tourRepository.insert(tourResponse.getData());
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG", t.getMessage());
            }
        });
    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}