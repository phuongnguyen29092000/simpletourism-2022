package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.DetailTourBinding;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailTourFragment extends Fragment {
    private String tourId;
    private DetailTourBinding binding;
    private ToursApiService toursApiService;
    private ImageView imageDetail;
    private TextView tvPrice;
    private TextView tvTime;
    private TextView tvHotel;
    private TextView tvAmount;
    private TextView tvAmountRemain;
    private Fragment detailFragment;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            tourId = (String) getArguments().getSerializable("IdTour");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.detail_tour, container, false);
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        imageDetail = (ImageView) view.findViewById(R.id.image_detail);

        tvPrice = (TextView) view.findViewById(R.id.tv_detail_price);
        tvTime = (TextView) view.findViewById(R.id.tv_time_detail);
        tvHotel = (TextView) view.findViewById(R.id.tv_hotel_detail);
        tvAmount = (TextView) view.findViewById(R.id.tv_amount_detail);
        tvAmountRemain = (TextView) view.findViewById(R.id.tv_amount_remain_detail);

        toursApiService = new ToursApiService();
        Call<TourResponse> call = toursApiService.getTourByIdAPi(tourId);
        call.enqueue(new Callback<TourResponse>() {
            @Override
            public void onResponse(Call<TourResponse> call, Response<TourResponse> response) {
                if(response.code() == 200){
                    TourResponse tourResponse = response.body();
                    Tour tour = tourResponse.data;
                    String pattern = "dd/MM/yyyy";
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                    Picasso.get().load("http://192.168.1.49:4000/" + tour.getImageAvatar().substring(7)).into(imageDetail);
//                    Toolbar toolbar = view.findViewById(R.id.toolbar);
//                    toolbar.setTag("abc");
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle(tour.getNameTour());
                    tvPrice.setText(Integer.toString(tour.getPrice()) + "đ");
                    tvTime.setText(simpleDateFormat.format(tour.getTimeStart()) + " - " + simpleDateFormat.format(tour.getTimeEnd()));
                    tvHotel.setText(tour.getNameHotel());
                    tvAmount.setText(Integer.toString(tour.getAmount()));
                    tvAmountRemain.setText(Integer.toString(tour.getAmount()));

                }else {
                    Toast.makeText(getContext(), "Wrong Id Tour", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<TourResponse> call, Throwable t) {
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
