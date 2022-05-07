package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.DomesticFragmentBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.ToursApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DomesticFragment extends Fragment {

    private DomesticFragmentBinding binding;
    private RecyclerView rvTour;
    private ToursApiService toursApiService;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
//        DomesticViewModel domesticViewModel =
//                new ViewModelProvider(this).get(DomesticViewModel.class);

        binding = DomesticFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

//        final TextView textView = binding.textDomestic;
//        domesticViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        rvTour = binding.rvItemTours;

        toursApiService = new ToursApiService();

        Call<ToursResponse> call = toursApiService.getToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG",response.code()+"");
                ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                TourAdapter tourAdapter = new TourAdapter(getContext(),tourResponse.getData());
                rvTour.setLayoutManager(new GridLayoutManager(getContext(),2));
                rvTour.setAdapter(tourAdapter);
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
//        tours.add(new Tour("dadad","Du lịch Anh - Scotland mùa Xuân","Anh",null,"Hà Lan là một quốc gia nhỏ ở vùng phía Tây"
//                ,"https://dulichhoangnguyen.com/upload/images/dai%20dien%201(1).jpg"
//                ,300000,"21/12/2022","25/12/2022",50,"London House Hotel"
//                ,"HDV đón quý khách tại ga Quốc tế, sân bay Tân Sơn Nhất",null,null));
//


//        TourAdapter tourAdapter = new TourAdapter(getContext(),tours);
//        rvTour.setLayoutManager(new GridLayoutManager(getContext(),2));
//        rvTour.setAdapter(tourAdapter);

    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}